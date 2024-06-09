import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';

const AboutLine = () => {
    const {token, user} = useAuth()
    // console.log(token)
    console.log("Hey harshal: ", user)
    return (
    <div>
        {user.about}
    </div>
    )
}

export default AboutLine
