import * as React from 'react';
import Dimensions from 'react-dimensions';
import { Table, Column, Cell } from 'fixed-data-table-2';

import { SortDir, SortTypes, SortKey, SortingOrder } from './sort-types';
import SortHeaderCell from './sortable-header-cell';
import TextCell from './text-cell';
import 'fixed-data-table-2/dist/fixed-data-table.css';

interface ModulesTableProps {
    containerWidth: number; // injected by react-dimension
    containerHeight: number; // injected by react-dimension
    colSortDirs: SortingOrder;
    modules: Module[];
    onSelect: (moduleId: ModuleId) => void;
    onSortChange: (columnKey: string, sortDir: SortDir) => void;
}

function getSortDirFor(key: SortKey, colSortDirs: SortingOrder) {
    return colSortDirs.key === key ? colSortDirs.direction : null;
}

// we use class since react-dimension uses refs
class ModuleTable extends React.Component<ModulesTableProps, {}> {
    render() {
        return (
            <Table
                className="reference-table__element"
                rowHeight={30}
                rowsCount={this.props.modules.length}
                headerHeight={50}
                width={this.props.containerWidth}
                height={this.props.containerHeight}
            >
                <Column
                    columnKey="id"
                    header={
                        <SortHeaderCell>
                            Module id
                        </SortHeaderCell>
                    }
                    cell={<TextCell data={this.props.modules} col="uid" />}
                    fixed={true}
                    flexGrow={1}
                    width={50}
                />
                <Column
                    columnKey="name"
                    header={
                        <SortHeaderCell
                            onSortChange={this.props.onSortChange}
                            sortDir={getSortDirFor('name', this.props.colSortDirs)}
                        >
                            Module name
                        </SortHeaderCell>
                    }
                    cell={
                        <TextCell
                            data={this.props.modules}
                            col="name"
                            onClick={this.props.onSelect}
                        />
                    }
                    fixed={true}
                    flexGrow={2}
                    width={310}
                />
                <Column
                    columnKey="size"
                    header={
                        <SortHeaderCell
                            onSortChange={this.props.onSortChange}
                            sortDir={getSortDirFor('size', this.props.colSortDirs)}
                        >
                            Module size
                        </SortHeaderCell>
                    }
                    cell={<TextCell data={this.props.modules} col="size" />}
                    fixed={true}
                    flexGrow={1}
                    width={70}
                />

                <Column
                    columnKey="reasonsCount"
                    header={
                        <SortHeaderCell
                            onSortChange={this.props.onSortChange}
                            sortDir={getSortDirFor('reasonsCount', this.props.colSortDirs)}
                        >
                            Module occurences
                        </SortHeaderCell>
                    }
                    cell={<TextCell data={this.props.modules} col="reasonsCount" />}
                    fixed={true}
                    flexGrow={1}
                    width={70}
                />
            </Table>
        );
    }
}

export default Dimensions({
    getHeight: function(elem: HTMLElement) {
        return elem.offsetHeight;
    },
    getWidth: function(elem: HTMLElement) {
        return elem.offsetWidth;
    }
})(ModuleTable);
