import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useQuery, useMutation } from 'graphql-hooks';
import { Button,Container,Grid,Paper,Snackbar,IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { Edit, Save, CloseIcon } from '@material-ui/icons';

const HOMEPAGE_QUERY = `query {settings {
    id
    type
    value
    displayName}}`;


const UPDATE_SETTING_MUTATION = `mutation UpdateSetting ($settingId: String!, $value: String!) {
        updateSetting(settingId: $settingId, value: $value)
    }`;

function Setting(props) {
    const {id, displayName,type,value} = props.setting;
    const isBoolean = (type == "boolean");
    const [editState, setEditState] = useState(false);
    const [editVal, setEditVal] = useState(value);
    const notBooleanAndeditState = isBoolean && !editState;
    const [open,setOpen] = useState(false);

    const [updateSetting] = useMutation(UPDATE_SETTING_MUTATION);

    const saveSetting = () => {
        updateSetting({variables: {settingId: id, value: editVal}});
        setEditState(false);
    };
    const toggleSwitch = () => {
        const trueVal = (editVal == "true" || editVal == 1);
        const newEditVal = (! trueVal).toString();

        updateSetting({variables: {settingId: id, value: newEditVal}});
        setEditVal(newEditVal);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return <React.Fragment><Grid item lg={4} key={id}>
        {displayName}
    </Grid>
        <Grid item lg={3}>
    {!editState && !isBoolean && editVal}
    {isBoolean &&
     <Switch
     checked={editVal == "true" || editVal == "1"}
     onChange={() => toggleSwitch()}
     inputProps={{ 'aria-label': 'secondary checkbox' }} />}
    {!isBoolean &&
     editState &&
     type == "string" &&
     <TextField
     value={editVal}
     onChange={(e) => setEditVal(e.target.value)}
     inputProps={{ 'aria-label': 'secondary checkbox' }} />}
    </Grid>
    <Grid item lg={5}>
    {!isBoolean && (!editState ?
        <Button color="primary" onClick={() => setEditState(true)}> <Edit/> edit</Button>
                :
        <Button color="primary" onClick={saveSetting}> <Save/> save</Button>)}
    </Grid>
        <Snackbar
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    message="Note archived"
        />
        </React.Fragment>;
}

function SettingsList(props) {
    return <Grid container spacing={3}>
        {props.settings.map(setting => <Setting key={setting.id} setting={setting} />)}
        </Grid> ;
}

function Search() {
    return <TextField id="standard-basic" label="Search" />;
}
// let data1 = [{ id: 1, displayName: "bla"},
//             { id: 2, displayName: "bla2"}];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export function App() {
    const classes = useStyles();
    const [filterStr, setFilterStr] = useState('');

    const { loading, error, data } = useQuery(HOMEPAGE_QUERY);


    if (loading) return 'Loading...';
    if (error) return 'Something Bad Happened';

    const settings = data.settings;
    const filteredData = settings.filter(v => v.displayName.startsWith(filterStr) && v.type != "array" && v.type != "select" && v.type != "associative array");


    return <div className={classes.root}>
        <Container maxWidth="lg">
        <TextField id="standard-basic" label="Search"
            onChange={(e) => setFilterStr(e.target.value)}
        />
        <SettingsList settings={filteredData}/>
        </Container>
        </div>;
};

export default App
