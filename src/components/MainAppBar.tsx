import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";


function MainAppBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography align={"left"} variant="h6" component="div" sx={{flexGrow: 1}}>
                        Cinephile Oasis
                    </Typography>

                    <div>
                        <Button color="inherit" endIcon={<AccountCircle/>}>
                            Me, the Cinephile
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default MainAppBar;