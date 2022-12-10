import { Container, Grid, Box } from "@mui/material";

export default function Footer(){
    return <footer>
        <Box 
        mt={2} 
        bgcolor="text.secondary"
        color="white"
        >
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Box>Some item</Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </footer>
}