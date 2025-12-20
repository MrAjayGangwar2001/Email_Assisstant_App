import React, { useState, useRef } from 'react'

import axios from 'axios'
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Grid,
    Paper,
    Snackbar,
    Alert
} from '@mui/material'
import SelectTone from './SelectTone'
import Footer from './Footer'
import FeedbackDrawer from './FeedbackDrawer'


import { Drawer, List, ListItemButton, ListItemText, Divider } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'


function Page() {
    const [emailContent, setEmailContent] = useState('')
    const [generatedReply, setGeneratedReply] = useState('')
    const [tone, setTone] = useState('')
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const [darkMode, setDarkMode] = useState(false)

    const [openHistory, setOpenHistory] = useState(false)

    const [openFeedback, setOpenFeedback] = useState(false)

    const [history, setHistory] = useState(
        JSON.parse(localStorage.getItem('emailReplies') || '[]')
    )



    const typingRef = useRef(null)


    const deleteHistoryItem = (deleteIndex) => {
        const updated = history.filter((_, index) => index !== deleteIndex)
        setHistory(updated)
        localStorage.setItem('emailReplies', JSON.stringify(updated))
    }





    const handleSubmit = async () => {
        setLoading(true)
        setGeneratedReply('')

        try {
            const res = await axios.post(
                'https://dr41zrycf9nrg.cloudfront.net/email/api/email',

                // 'https://3.27.114.7:8080/email/api/email',
                // '/email/api/email',
                { emailContent, tone }   // length later add hoga
            )
            typeText(String(res.data))

        } catch (err) {
            alert(err.response?.data?.message || err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }



    const handleCopy = async () => {
        await navigator.clipboard.writeText(generatedReply)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const typeText = (fullText) => {
        if (!fullText || typeof fullText !== 'string') return

        // 🔥 clear old typing if exists
        if (typingRef.current) {
            clearInterval(typingRef.current)
        }

        let index = 0
        setGeneratedReply('')

        typingRef.current = setInterval(() => {
            index++

            setGeneratedReply(fullText.slice(0, index))

            if (index >= fullText.length) {
                clearInterval(typingRef.current)
                typingRef.current = null
                saveHistory(fullText)
            }
        }, 15)
    }



    const saveHistory = (reply) => {
        const newHistory = [
            { reply, date: Date.now() },
            ...history
        ].slice(0, 10)

        setHistory(newHistory)
        localStorage.setItem('emailReplies', JSON.stringify(newHistory))
    }


    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            background: {
                default: darkMode ? '#121212' : '#fafafa',
                paper: darkMode ? '#1e1e1e' : '#ffffff'
            }
        },
        shape: {
            borderRadius: 10
        }
    })


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                width: '100%',
                '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(6px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                }
            }}>

                <nav className={`navbar navbar-expand-lg shadow-sm border-bottom ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'
                    }`}>
                    <div className="container-fluid px-4">

                        {/* LOGO + TITLE */}
                        <a className="navbar-brand d-flex align-items-center gap-2 m-0 p-0" href="#">
                            <img
                                src="/image.png"
                                alt="App Logo"
                                style={{ height: 45, width: 45, borderRadius: 8 }}
                            />
                            <span className="fw-semibold">Email Reply Assistant</span>
                        </a>

                        {/* HAMBURGER BUTTON (Mobile) */}
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarActions"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* COLLAPSIBLE CONTENT */}
                        <div className="collapse navbar-collapse justify-content-end" id="navbarActions">
                            <div className="d-flex flex-column flex-lg-row gap-2 mt-2 mt-lg-0 align-items-start">

                                <button
                                    className="btn btn-outline-none text-center btn-sm w-auto"
                                    onClick={() => setDarkMode(!darkMode)}
                                    style={{
                                        width: 38,
                                        height: 28,
                                        border: 'none'
                                    }}
                                    // title="dark/light"
                                    title={darkMode ? 'click for Light mode' : 'click for Dark mode'}

                                >
                                    <i className={`fa-solid ${darkMode ? 'fa-sun text-warning fa-xl ms-4' : 'fa-moon fa-xl ms-4'}`}></i>
                                </button>

                                <button
                                    className="btn btn-outline-secondary rounded  btn-sm w-auto"
                                    onClick={() => setOpenFeedback(true)}
                                >
                                    Feedback
                                </button>

                                <button
                                    className="btn btn-outline-secondary rounded btn-sm w-auto"
                                    onClick={() => setOpenHistory(true)}
                                >
                                    History
                                </button>

                            </div>
                        </div>
                    </div>
                </nav>


                {/* MAIN SPLIT SCREEN */}
                <div className="container-fluid h-100">
                    <div className="row h-100">

                        {/* LEFT */}
                        <div className="col-12 col-md-6 p-3 h-100">
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    borderRadius: 3,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography variant="body2" color="text.secondary" mb={1}>
                                    Paste the email you received
                                </Typography>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={10}
                                    value={emailContent}
                                    placeholder="Paste original email here..."
                                    onChange={(e) => setEmailContent(e.target.value)}

                                />
                                <div className="d-flex justify-content-between">
                                    <small className="text-muted">
                                        Your email content will not be stored
                                    </small>
                                    <small className="text-muted">
                                        {emailContent.length} characters
                                    </small>
                                </div>


                                <SelectTone tone={tone} setTone={setTone} />

                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{ mt: 1, py: 1.4 }}
                                    disabled={!emailContent || loading}
                                    onClick={handleSubmit}
                                    className="btn btn-primary px-4"
                                >

                                    {loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : generatedReply ? (
                                        'Regenerate'
                                    ) : (
                                        '✨ Generate'
                                    )}
                                </Button>
                            </Paper>
                        </div>

                        {/* RIGHT */}
                        <div className="col-12 col-md-6 p-3 h-100">
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    borderRadius: 3,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography variant="body2" color="text.secondary" mb={1}>
                                    Review and copy the AI-generated reply
                                </Typography>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={14}
                                    value={generatedReply}
                                    InputProps={{ readOnly: true }}

                                    placeholder={
                                        loading
                                            ? 'AI is generating your reply...'
                                            : 'AI reply will appear here...'
                                    }

                                />

                                <Button
                                    variant={copied ? 'contained' : 'outlined'}
                                    color={copied ? 'success' : 'primary'}
                                    fullWidth
                                    sx={{ my: 2, py:1 }}
                                    disabled={!generatedReply}
                                    onClick={handleCopy}
                                >
                                    {copied ? 'Copied ✓' : 'Copy to Clipboard'}
                                </Button>
                            </Paper>
                        </div>

                    </div>
                </div>


                <Snackbar open={copied} autoHideDuration={2000}>
                    <Alert severity="success" variant="filled">
                        Reply copied to clipboard!
                    </Alert>
                </Snackbar>


                <Drawer
                    anchor="right"
                    open={openHistory}
                    onClose={() => setOpenHistory(false)}
                >
                    <Box sx={{ width: 270, p: 2 }}>
                        <Typography variant="h6" mb={1}>Reply History</Typography>
                        <Divider />


                        {history.map((item, index) => (
                            <ListItemButton
                                key={index}
                                sx={{
                                    my: 1,
                                    borderRadius: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    position: 'relative'
                                }}
                                onClick={() => {
                                    setGeneratedReply(item.reply)
                                    setOpenHistory(false)
                                }}
                            >
                                <ListItemText
                                    primary=<>
                                        <i className="fa-solid fa-reply me-2 text-primary"></i>
                                        {item.reply.slice(0, 80) + '...'}
                                    </>
                                    secondary=
                                    {
                                        <Box component="span">
                                            <Typography variant="caption" color="text.secondary" display="block">
                                                Click to reuse this reply
                                            </Typography>
                                            <Typography variant="caption" color="text.disabled">
                                                {new Date(item.date).toLocaleString()}
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{ pr: 4 }}
                                />

                                {/* DELETE BUTTON */}
                                <Button

                                    title='delete'
                                    color="error"
                                    sx={{
                                        fontSize: 25,
                                        opacity: 0,
                                        position: 'absolute',
                                        top: 0,
                                        right: -15,
                                        transition: 'opacity 0.2s ease',
                                        '.MuiListItemButton-root:hover &': {
                                            opacity: 1
                                        }
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteHistoryItem(index)
                                    }}
                                >
                                    🗑
                                </Button>
                            </ListItemButton>
                        ))}

                    </Box>
                </Drawer>
            </Box>

            <Footer />

            <FeedbackDrawer
                open={openFeedback}
                onClose={() => setOpenFeedback(false)}
            />

        </ThemeProvider>
    )
}

export default Page
