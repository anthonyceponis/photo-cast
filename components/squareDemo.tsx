import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

export const SquareDemo = () => {
    return (
            <Image className = "animate-spin h-5 w-5 mr-3 ..." 
            style={{backgroundColor: 'blue'}} 
            source={require('../iconTest.png')} />
        );
    }