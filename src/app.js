import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useQuery } from 'graphql-hooks';
import { Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { Edit, Save } from '@material-ui/icons';

const HOMEPAGE_QUERY = `query {settings {
    id
    displayName}}`;

function Setting(props) {
    const {id, displayName} = props.setting;
    const [editState, setEditState] = useState(true);

    const handleState = (e) => {
        setEditState(false);
    };
    return <li key={id}>{displayName}
        <Switch
        checked={editState}
        onChange={handleState}
        inputProps={{ 'aria-label': 'secondary checkbox' }} />
        <Button color="primary"> <Edit/> edit1</Button>
        <Button color="primary"> <Save/> save</Button>
        </li>;
}

function SettingsList(props) {
    return <ul> {props.settings.map(setting => <Setting setting={setting} />)}</ul>;
}

function Search() {
    return <TextField id="standard-basic" label="Search" />;
}

export function App() {
    const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {});

    if (loading) return 'Loading...'
    if (error) return 'Something Bad Happened'

    return <div>
        <Search />
        <SettingsList settings={data.settings}/>
        </div>;
};

export default App
