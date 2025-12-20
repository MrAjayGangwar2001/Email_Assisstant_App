import React from 'react'
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material'

function SelectTone({ tone, setTone }) {
    return (
        <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
                <InputLabel>Tone (optional)</InputLabel>
                <Select
                    value={tone}
                    label="Tone (optional)"
                    onChange={(e) => setTone(e.target.value)}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Professional">Professional</MenuItem>
                    <MenuItem value="Casual">Casual</MenuItem>
                    <MenuItem value="Friendly">Friendly</MenuItem>
                    <MenuItem value="Formal">Formal</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectTone
