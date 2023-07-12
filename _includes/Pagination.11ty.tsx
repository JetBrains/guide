import h, {JSX} from "vhtml";

export type PaginationProps = {
    pagination: Pagination
}

type Pagination = {
    items: any[],
    pageNumber: number,
    hrefs: string[],
    href: Href,
    pages: any[],
    page: Href
}

type Href = {
    next: string,
    previous: string,
    first: string,
    last: string
}

const Pagination = ({ pagination }: PaginationProps): JSX.Element => {

    const ellipsis = <li><span className="pagination-ellipsis">&hellip;</span></li>
    const current = pagination.href;

    return (
    <nav className="pagination" role="navigation" aria-label="pagination">
        <a className={`pagination-previous ${current.previous ? '' : 'is-disabled'}`} aria-disabled={!current.previous} href={current.previous}>Previous</a>
        <a className={`pagination-next ${current.next ? '' : 'is-disabled'}`} aria-disabled={!current.next} href={current.next}>Next page</a>
        <ul className="pagination-list is-centered">
            {pagination.pageNumber > 1 && <li><a href={pagination.hrefs[0]} class="pagination-link" aria-label="Goto Page 1">1</a></li> }
            {pagination.pageNumber > 1 && ellipsis}
            {current.previous &&
            <li>
                <a className={`pagination-link`}
                   href={current.previous}
                   aria-label={`Goto page ${pagination.pageNumber}`}>
                    {pagination.pageNumber}
                </a>
            </li>}
            <li>
                <a className={`pagination-link is-current`}
                   href={pagination.hrefs[pagination.pageNumber]}
                   aria-label={`Goto page ${pagination.pageNumber + 1}`}
                   aria-current={true}>
                    {pagination.pageNumber + 1}
                </a>
            </li>
            {current.next &&
            <li>
                <a className={`pagination-link`}
                   href={current.next}
                   aria-label={`Goto page ${pagination.pageNumber + 2}`}
                   aria-current={true}>
                    {pagination.pageNumber + 2}
                </a>
            </li>}
            {pagination.pageNumber < pagination.hrefs.length - 2 && ellipsis}
            {pagination.pageNumber < pagination.hrefs.length - 2 && <li><a href={pagination.hrefs[pagination.hrefs.length - 1]} class="pagination-link" aria-label={`Goto Page ${pagination.hrefs.length}`}>{pagination.hrefs.length}</a></li> }
        </ul>
    </nav>
    );
}

export default Pagination;
