import React from 'react';

const title = React.createElement('h1', {key:1}, `0. Hello world with React.createElement`);
const hello = React.createElement('h2', {key:2}, `Hello world`);

export const HelloWorld = React.createElement('div', {className:'hello',key:'01'}, [title,hello]);
