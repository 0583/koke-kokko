import {Box, Button, FormControlLabel, Stack, Switch, TextField} from "@mui/material";

function HomeView() {
    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{ maxWidth: 400 }}>
                <TextField
                    id="outlined-textarea"
                    label="What's happening?"
                    placeholder="Input here"
                    multiline
                />
                <Stack direction="row" justifyContent="flex-end">
                    <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Visible to Everyone" />
                    <Button variant="outlined" >Kokko!</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default HomeView;