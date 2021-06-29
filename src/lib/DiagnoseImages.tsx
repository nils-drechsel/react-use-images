import React, { FunctionComponent } from "react";

interface Props {
    invalid?: Array<string>;
    loading?: Array<string>;
    loaded?: Array<string>;
}

export const DiagnoseImages: FunctionComponent<Props> = ({ invalid, loading, loaded }) => {
    return (
        <div>
            <div>invalid: {invalid}</div>
            <div>loading: {loading}</div>
            <div>loaded: {loaded}</div>
        </div>
    );
};

export default DiagnoseImages;
