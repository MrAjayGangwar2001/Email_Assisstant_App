import {
    Drawer,
    Box,
    Typography,
    TextField,
    Button
} from '@mui/material'
import { useState } from 'react'

function FeedbackDrawer({ open, onClose }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        feedback: "",
    });
    const [status, setStatus] = useState(""); // Success or error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.feedback.trim()) return alert('Please enter feedback')

        setStatus("Sending...");

        const formData = new FormData();
        formData.append("access_key", "d26628f9-7385-4687-b864-4244032ee876");
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("feedback", form.feedback);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setStatus("Message sent successfully!");
                alert('Thank you for your feedback 🙏')
                setForm({ name: "", email: "", feedback: "" });
                // setName('')
                // setFeedback('')
                onClose()
            } else {
                setStatus("Something went wrong. Try again later.");
            }
        } catch (error) {
            setStatus("Error sending message.");
        }
    };

    return (
        <Drawer anchor="bottom" open={open} onClose={onClose}>
            <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" mb={2}>
                    Feedback
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        name="name"
                        label="Your Name"
                        value={form.name}
                        required
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        name="email"
                        type='email'
                        label="Your email"
                        value={form.email}
                        required
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        multiline
                        name="feedback"
                        rows={4}
                        label="Your Feedback"
                        value={form.feedback}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Submit Feedback
                    </Button>

                </form>
                {status && (
                    <div className="mt-3 text-center text-muted small">{status}</div>
                )}
            </Box>
        </Drawer>
    )
}

export default FeedbackDrawer
