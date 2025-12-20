import { Box, Typography, Link } from '@mui/material'

function Footer() {
    return (
        <Box
            sx={{
                mt: 2,
                py: 1.5,
                display: 'flex',
                justifyContent: 'space-evenly',
                textAlign: 'center',
                borderTop: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper'
            }}
        >
            <Typography variant="body2" color="text.secondary">
                Developed by{' '}
                <Link
                    href="mailto:gangwar030@gmail.com?subject=Related to AI Email Reply Assistant App&body=I came on your AI Email Reply Assistant Application."
                    underline="hover"
                    color="inherit"
                    fontWeight={500}
                >
                    Ajay Gangwar
                </Link>
            </Typography>

            <Typography variant="caption" color="text.secondary">
                © {new Date().getFullYear()} All rights reserved
            </Typography>
        </Box>
    )
}

export default Footer
