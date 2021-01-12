import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import MovieFilterRoundedIcon from '@material-ui/icons/MovieFilterRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BuildIcon from '@material-ui/icons/Build';
import LanguageIcon from '@material-ui/icons/Language';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        paddingBottom: theme.spacing(2),
    },
    title:{
        flexGrow: 1,
    },
}));

function Header() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const classes = useStyles()

    function handleDialogOpen(){
        setDialogOpen(true);
    }

    function handleDialogClose(){
        setDialogOpen(false);
    }

    return (
            <div className={classes.root}>
                <IconButton onClick={handleDialogOpen}><MovieFilterRoundedIcon style={{fontSize:'60'}} color="secondary"/><Typography color="secondary" variant="h2">THE SHOPPIES</Typography></IconButton>
                <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    maxWidth='md'
                    fullWidth
                >
                    <DialogTitle>Developed By Leon Trieu</DialogTitle>
                    <DialogContent>
                        <Typography variant="h5">This website application was built for Shopify's 2021 Summer Intern Challenge!</Typography>
                    </DialogContent>
                    <DialogContent>
                        <ListItem>
                            <ListItemIcon><BuildIcon/></ListItemIcon>
                            <ListItemText>Javascript, ReactJS, NodeJS, Fetch API, and Material-UI</ListItemText>
                        </ListItem>
                    </DialogContent>
                    <DialogContent>
                        <List>
                            <ListItem>
                            <Button href="https://trtri2.github.io" target="_blank" fullWidth variant="contained" startIcon={<LanguageIcon/>}>
                                Portfolio
                            </Button>
                            </ListItem>
                            <ListItem>
                            <Button href="https://github.com/trtri2/TheShoppies2021" target="_blank" fullWidth variant="contained" startIcon={<GitHubIcon/>}>
                                Github Repo
                            </Button>
                            </ListItem>
                            <ListItem>
                            <Button href="https://www.linkedin.com/in/trtri2/" target="_blank" fullWidth variant="contained" startIcon={<LinkedInIcon/>}>
                                LinkedIn Profile
                            </Button>
                            </ListItem>
                        </List>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleDialogClose}>CLOSE</Button>
                    </DialogActions>
                </Dialog>
            </div>
    );
}

export default Header;
