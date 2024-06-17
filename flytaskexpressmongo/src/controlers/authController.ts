import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Role } from '../models/Role';
import User from '../models/User';
import { generateLoginToken, generateRecoveryToken } from '../jwt/utils';
import { MailTemplate } from '../utils/MailTemplateUtil';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    tokenType: string;
    sub: string;
    // Add other fields as needed
}

export const whoami  = async (req: Request, res: Response) => {
    res.status(200).send('Token Valid Ts');
};


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ usr_email: email });
        // Check if user exists
        if (!user) {
            throw new Error('Bad credentials');
        }
        // Compare provided password with stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.usr_password);
        if (!isPasswordMatch) {
            throw new Error('Bad credentials');
        }
        // Generate JWT token
        const token = generateLoginToken(user);
        // Success response
        const response = {
            id: user._id,
            message: 'Logged successfully',
            status: 'success',
            token: token
        };
        res.status(200).json(response);
    } catch (error: any) {
        // Error response
        const response = {
            message: error.message,
            status: 'error'
        };
        res.status(500).json(response);
    }
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            const response = {
                "message": "Passwords do not match",
                "status": "error"
            };
            return res.status(400).json(response);
        }
        const existingUser = await User.findOne({ usr_email: email });
        if (existingUser) {
            const response = {
                "message": "Email already exists",
                "status": "error"
            };
            return res.status(400).json(response);
        }
        // Hash the password using bcrypt
        const saltRounds = 10; // Recommended number of rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Create user in the database with hashed password
        const user = await User.create({
            usr_name: name,
            usr_email: email,
            usr_password: hashedPassword, // Store hashed password
            usr_role: Role.CLIENT
        });
        // Success response
        const response = {
            "user id": user._id,
            "message": "User registered successfully",
            "status": "success"
        };
        res.status(200).json(response);
    } catch (error: any) {
        // Error response
        const response = {
            "message": error.message || "Failed to register user",
            "status": "error"
        };
        res.status(500).json(response);
    }
};

export const passwordRecovery = async (req: Request, res: Response) => {
    const email = req.query.email as string;
    try {
        if (!email) {
            throw new Error('Email parameter is required');
        }

        // Mocked user retrieval (replace with your actual logic to fetch user from database)
        const user = await User.findOne({ usr_email: email });

        if (!user) {
            throw new Error('User not found');
        }
        // Generate recovery token
        const token = generateRecoveryToken(user);
        
        // Construct email message (replace with your email sending logic)
        const htmlMessage = MailTemplate(token);
        const subject = 'Password Recovery';
        const fromEmail = process.env.EMAIL_HOST_USER || 'your@example.com';
        const recipientList = [user.usr_email];
        
        // Send the email using nodemailer (replace with your email sending logic)
        const transporter = nodemailer.createTransport({
            // Setup your email transporter here (SMTP, OAuth2, etc.)
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_HOST_USER,
                pass: process.env.EMAIL_HOST_PASSWORD
            }
        });

        await transporter.sendMail({
            from: fromEmail,
            to: recipientList,
            subject: subject,
            html: htmlMessage
        });

        const response = {
            message: "Recovery email sent successfully",
            status: "success"
        };
        
        return res.status(200).json(response);
    } catch (error:any) {
        console.error('Error sending recovery email:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: "error"
        };
        
        return res.status(500).json(response);
    }
};

export const recoverPassword = async (req: Request, res: Response) => {
    const { newPassword, passwordConfirmation, token } = req.body;
    try {
        // Verify token and decode userId
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY || 'dummykey') as DecodedToken;

        if (decodedToken.tokenType !== "RECOVERY") {
            throw new Error('Invalid Token Type');
        }      
        // Validate newPassword and passwordConfirmation
        if (newPassword !== passwordConfirmation) {
            throw new Error('Passwords do not match');
        }
        const user = await User.findOne({ usr_email: decodedToken.sub });
        if (!user) {
          throw new Error('User not found');
        }        // Hash the password using bcrypt

        const saltRounds = 10; // Recommended number of rounds
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        
        user.usr_password = hashedPassword;
        await user.save();

        const response = {
            message: "Password recovered successfully",
            status: "success"
        };
        return res.status(200).json(response);
    } catch (error: any) {
        console.error('Error updating password:', error);
        const response = {
            message: error.message || 'Internal Server Error',
            status: "error"
        };
        return res.status(500).json(response);
    }
};