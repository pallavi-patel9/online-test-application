
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       enum: ['admin', 'student', 'teacher'],
//       default: 'student',
//     },
//   },
//   {
//     timestamps: true,
//   } 
// );

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next(); // ensure we exit early
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// // Match entered password with hashed one
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /\d{10}/.test(v); 
        },
        message: props => `${props.value} is not a valid mobile number!`
      }
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'teacher'],
      default: 'student',
    },
    studentDetails: {
      university: {
        type: String,
        required: function() { return this.role === 'student'; }
      },
      course: {
        type: String,
        required: function() { return this.role === 'student'; }
      },
      semester: {
        type: String,
        required: function() { return this.role === 'student'; }
      }
    },
    teacherDetails: {
      department: {
        type: String,
        required: function() { return this.role === 'teacher'; }
      },
      designation: {
        type: String,
        required: function() { return this.role === 'teacher'; }
      },
      expertise: {
        type: [String],
        default: []
      }
    }, 
    terms: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match entered password with hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

