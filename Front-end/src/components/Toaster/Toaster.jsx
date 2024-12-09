import React from 'react';
import { Toaster } from 'react-hot-toast';

const CusToast = () => {
    return (
        <Toaster position="top-center" reverseOrder={false} gutter={8}
            toastOptions={{
                error: {
                    duration: 2000,
                    style : {       
                        background: 'black',
                        color: 'white',
                        fontSize: 'medium'
                    },
                },
                success: {
                    duration: 2000,
                    style : {       
                        background: 'black',
                        color: 'white',
                        fontSize: 'medium'
                    },
                },
            }} 
        />
    );
};

export default CusToast;