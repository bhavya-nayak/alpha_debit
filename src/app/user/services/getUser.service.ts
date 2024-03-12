'use strict'; 
// Import Config
import config from '../../../config/constant';

// Import Static

// Import Middleware

// Import Controllers

// Import Interface

// Import Helpers
import AuthHelper from "../../auth/helper/auth.helper"
// Import validations

// Import Transformers

// Import Libraries

// Import Thirdparty
import { query } from "express";
import authRepo from '../../auth/repo/auth.repo';

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
👑 @creator : Bhavya Nayak
🚩 @uses : get me API service
🗓 @created : 12/03/2024
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/
const getUser = async (container: any) => { 

    try {

        const {
            input: {
                params,
                query,
                logged_in_user
            },

        } = container;

        //
        // get all the details of user
        //
        const result = await authRepo.getUserData(logged_in_user.email);
        
        //
        //  set the result in in container
        //
        container.output.result = result;
        
        return container;

    } catch (error) {

        throw error;

    }
}

export default getUser;