import {Feedback} from '../models/feedback.model.js'

const submitFeedback = async (req, res) => {
    
    console.log("Server received feedback");

    const { name, email, message,rating} = req.body;

    // Validate input fields
    if ([name, email, message,rating].every(field => field && field.trim() === "")) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user with the same email or name already exists
        const existingFeedback = await Feedback.findOne({ email });

        if (existingFeedback) {
            return res.status(409).json({ error: "Feedback with this email already exists" });
        }

        // Create new feedback
        const newFeedback = await Feedback.create({
            name,
            email,
            message,
            rating,
            
            
        });

        return res.status(201).json({
            success: true,
            data: newFeedback,
            message: "Feedback submitted successfully"
        });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export  { submitFeedback };
