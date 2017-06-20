import * as React from 'react';
import { Cell } from 'fixed-data-table-2';
const noop = () => null;

export interface TextCellProps {
    rowIndex?: number; // will be injected by 'fixed-data-table'
    data: Module;
    col: keyof Module;
    onClick?: (id: ModuleId) => void;
}

const TextCell: React.SFC<TextCellProps> = props => {
    const { rowIndex, data, col, onClick, ...cleanProps } = props;
    const value = data[col][rowIndex];
    const clickHandler = onClick || noop;

    return (
        value ?
            <Cell {...cleanProps} onClick={() => clickHandler(value.moduleUid)}>
                {value.moduleName}
            </Cell> :
            null
    );
};

export default TextCell;