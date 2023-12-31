const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: [true, "First name required"],
        },
        lastName: {
            type: String,
            trim: true,
            required: [true, "Last name required"],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "email required"],
            unique: true,
            lowercase: true,
        },
        phone: String,
        profileImg: String,

        password: {
            type: String,
            required: [true, "password required"],
            minlength: [6, "Too short password"],
        },
        passwordChangedAt: Date,
        passwordResetCode: String,
        passwordResetExpires: Date,
        passwordResetVerified: Boolean,
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        active: {
            type: Boolean,
            default: true,
        },
        // Child reference (one to many)
        wishlist: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
            },
        ],
        addresses: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                alias: String,
                details: String,
                phone: String,
                city: String,
                postalCode: String,
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    // Hash the password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
