const mongoose = require('mongoose');

const examSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        // successRate: {
        //     type: Number,
        //     default: 0
        // },
        totalTime: {
            type: Number,
            required: true,
            min: 1,
            default: 10 // Default 45 minutes if not specified
        },  
        totalAttempts: {
            type: Number,
            default: 0
        },
        successRates: {
            type: [Number],
            default: []
        },
        questions: [
            {
                question: {
                    type: String,
                    required: true,
                    trim: true
                },
                choices: {
                    type: [String],
                    required: true,
                    validate: {
                        validator: function (v) {
                            return v.length >= 2 &&
                                v.every(c => c.trim().length > 0);
                        },
                        message: 'Each question must have at least 2 non-empty choices'
                    }
                },
                correct: {
                    type: String,
                    required: true,
                    validate: {
                        validator: function (v) {
                            return this.choices.includes(v);
                        },
                        message: 'Correct answer must match one of the choices'
                    }
                }
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        },
        lastPlayed: {
            type: Date
        },
        isPublic: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Virtual for questionCount
examSchema.virtual('questionCount').get(function () {
    return this.questions.length;
});

// Pre-save validation
examSchema.pre('save', function (next) {
    this.questions.forEach(q => {
        if (!q.choices.includes(q.correct)) {
            throw new Error(`Correct answer "${q.correct}" not found in choices`);
        }
    });
    next();
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;