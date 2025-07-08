import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import UserDashBoardHome from './UserDashBoardHome';
import AdminDashBoard from './AdminDashBoard';
import RiderDashBoard from './RiderDashBoard';
import Forbidden from '../../Forbidden/Forbidden';

const DashBoardHome = () => {
    const {role,roleLoading} = useUserRole();

    if(roleLoading){
       return '...loading'
    }

    if(role === 'user'){
        return <UserDashBoardHome></UserDashBoardHome>
    }

    else if(role === 'admin'){
        return <AdminDashBoard></AdminDashBoard>
    }

    else if(role === 'rider'){
        return <RiderDashBoard></RiderDashBoard>
    }
    
    else{
        return <Forbidden></Forbidden>
    }
   
};

export default DashBoardHome;