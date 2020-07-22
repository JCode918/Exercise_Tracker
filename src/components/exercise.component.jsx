import { Link } from 'react-router-dom';
import React, { Component } from 'react';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <button type="button" className="btn btn-outline-danger" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</button>
        </td>
    </tr>
)

export default Exercise;