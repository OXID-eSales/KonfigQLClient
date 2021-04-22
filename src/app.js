import ReactDOM from "react-dom";
import React, { useState } from "react";
import { useQuery } from 'graphql-hooks';
import { Button } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { Edit, Save } from '@material-ui/icons';

const HOMEPAGE_QUERY = `query {products {
    id
    title}}`;

function Setting(props) {
    // const [editState, setEditState] = useState(0);
    const {id, title} = props.setting;
    return <li key={id}>{title}
        <Switch
        checked='true'
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }} />
        <Button color="primary"> <Edit/> edit</Button>
        <Button color="primary"> <Save/> save</Button>
        </li>;
}

function SettingsList() {
    const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {});

    if (loading) return 'Loading...'
    if (error) return 'Something Bad Happened'

    return (
            <ul>
            {data.products.map(setting => <Setting setting={setting} />)}
            </ul>
    );
}

export function App() {
    return <div>
        <TextField id="standard-basic" label="Search" />
        <SettingsList/>
        </div>;
};

export default App
