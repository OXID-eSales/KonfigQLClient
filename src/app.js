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
    const [editState, setEditState] = useState(false);

    return <li key={id}>{displayName}
        <Switch
            checked={editState}
            onChange={() => setEditState(!editState)}
            inputProps={{ 'aria-label': 'secondary checkbox' }} />
        {
        !editState ?
        <Button color="primary" onClick={() => setEditState(true)}> <Edit/> edit</Button>
                :
        <Button color="primary" onClick={() => setEditState(false)}> <Save/> save</Button>
}
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
        <TextField id="standard-basic" label="Search"
            onChange={(e) => setFilterStr(e.target.value)}
        />
        <SettingsList settings={filteredData}/>
        </div>;
};

export default App
