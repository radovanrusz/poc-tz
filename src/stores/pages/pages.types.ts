export type role = 'manager'|'worker'|'coworker';

export type rolesAllowed = {
    type: string;
    rolesList: role[];
};

export type Subpage = {
    id: string;
    name: string;
    content: any;
};

export type Page = {
    id: string;
    name: string;
    allowed: any;
    subpages: Subpage[];
    currentSubpage: Subpage|any;
};

export type PagesStatus = 'initial'|'loading'|'loaded';

export interface PagesStore {
    allPages: Page[];
    userPages: Page[];
    pagesStatus: PagesStatus;
    currentPage: Page;
}
