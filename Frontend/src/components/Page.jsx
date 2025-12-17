import React, { useState } from 'react'
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import SelectTone from './SelectTone';


function Page() {
    const [emailContent, setEmailContent] = useState('');
    const [loading, setLoading] = useState(false);

    const [generatedReply, setGeneratedReply] = useState('');


    const handleSubmit = async () => {

        setLoading(true)

        try {
            const response = await axios.post("http://localhost:8080/email/api/email", {
                emailContent,
                tone
            });
            setGeneratedReply(typeof response.data === 'string' ?
                response.data : JSON.stringify(response.data)
            )
        } catch (error) {
            alert("error", error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Container maxWidth="sm" sx={{ py:2 }}>
                <Typography variant='h3' component="h1" gutterBottom>
                    Email Reply Generator
                </Typography>

                <Box sx={{ mx: 3 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        variant='outlined'
                        label="origional Email Content"
                        value={emailContent || ''}
                        onChange={(e) => setEmailContent(e.target.value)}
                    />
                </Box>
                <SelectTone />

                <Button
                    sx={{ mx: 3, my:2 }}
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!emailContent || loading}>
                    {loading ? <CircularProgress size={24} /> : "Generate"}
                </Button>


                <Box sx={{ mx: 3, }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        variant='outlined'
                        aria-readonly
                        // label="Generated Email Content"
                        value={generatedReply || ''}
                        onChange={(e) => setEmailContent(e.target.value)}
                    />
                    <Button
                        className='my-3 p-2'
                        variant='outlined'
                        onClick={() => navigator.clipboard.write(generatedReply)}
                    >
                        copy to clipboard
                    </Button>
                </Box>
            </Container>
        </>
    )
}

export default Page
