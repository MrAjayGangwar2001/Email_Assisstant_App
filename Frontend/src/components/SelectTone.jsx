import React, { useState } from 'react'
// import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from '@mui/material';

function SelectTone({tone, setTone}) {

    const handleChange = (e) => {
        setTone(e.target.value);
    };

   
    return (
        <Container maxWidth="sm" sx={{ py: 1 }}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ my: 3, minWidth: 150, }}>
                    <InputLabel id="demo-simple-select-label">Tone(optional)</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tone}
                        label="Tone"
                        onChange={handleChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Professional">Professional</MenuItem>
                        <MenuItem value="Casual">Casual</MenuItem>
                        <MenuItem value="Normal">Normal</MenuItem>
                        <MenuItem value="Friendly">Friendly</MenuItem>
                    </Select>
                </FormControl>

            </Box>
            
        </Container>
    )
}

export default SelectTone
