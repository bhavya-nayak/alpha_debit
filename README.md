**How to run this project?**

1. Take Git Clone
2. Run the `npm install`
3. Create/Update the ENV file and Add the below key into that
        a. NODE_ENV
        b.PORT
        c.JWT_SECRET_KEY(You can set string value)
    
4. to run the project hit these commands into the terminal 1.`npm run build`    2. `npm run start` 

**API Contains**

1. Login
2. Register
        -> Email Register (Step 1)
        -> Address completion (Step 2)
                -> Pass Bearer token to get authorized.
        -> Profile completion(Step 3)
                -> Pass Bearer token to get authorized.