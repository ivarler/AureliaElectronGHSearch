import {Repository} from 'Repository';

export class SearchResult{
    constructor(total_count, incomplete_results, items) {
        this.total_count = total_count;
        this.incomplete_results = incomplete_results;
        this.items = items;
    }
    total_count : number;
    incomplete_results : boolean;
    items : Repository[];
}