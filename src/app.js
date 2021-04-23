import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useQuery } from 'graphql-hooks';
import { Button,Container,Grid,Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { Edit, Save } from '@material-ui/icons';

const HOMEPAGE_QUERY = `query {settings {
    id
    type
    value
    displayName}}`;


function Setting(props) {
    const {id, displayName,type,value} = props.setting;
    const isBoolean = (type == "boolean");
    const [editState, setEditState] = useState(false);
    const notBooleanAndeditState = isBoolean && !editState;

    return <li key={id}>{displayName}
    {type}
    {!editState && !isBoolean && value}
    {isBoolean &&
        <Switch
            checked={value == "true"}
            // onChange={() => setEditState(!editState)}
            inputProps={{ 'aria-label': 'secondary checkbox' }} />}
    {!isBoolean &&
      editState &&
     type == "string" &&
     <TextField
     value={value}
     // checked={editState}
     // onChange={() => setEditState(!editState)}
     inputProps={{ 'aria-label': 'secondary checkbox' }} />}
    {!isBoolean && (!editState ?
        <Button color="primary" onClick={() => setEditState(true)}> <Edit/> edit</Button>
                :
        <Button color="primary" onClick={() => setEditState(false)}> <Save/> save</Button>)}
        </li>;
}

function SettingsList(props) {
    return <ul> {props.settings.map(setting => <Setting key={setting.id} setting={setting} />)}</ul>;
}

function Search() {
    return <TextField id="standard-basic" label="Search" />;
}
let data1 = [{ id: 1, displayName: "bla"},
            { id: 2, displayName: "bla2"}];

export function App() {
    const [filterStr, setFilterStr] = useState('');

    const { loading, error, data } = useQuery(HOMEPAGE_QUERY);


    if (loading) return 'Loading...';
    if (error) return 'Something Bad Happened';

    const settings = data.settings;
    const filteredData = settings.filter(v => v.displayName.startsWith(filterStr));

    return <div>
        <Container maxWidth="lg">
        <TextField id="standard-basic" label="Search"
            onChange={(e) => setFilterStr(e.target.value)}
        />
        <SettingsList settings={filteredData}/>
        </Container>
        </div>;
};

export default App
