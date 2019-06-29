import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import WorkProgramsTable from "./workProgramsTable";
import Pagination from "./common/pagination";
import { getWorkPrograms } from "../services/fakeWorkProgramService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";

class WorkPrograms extends Component {
  state = {
    workPrograms: [],
    genres: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ workPrograms: getWorkPrograms(), genres });
  }

  handleDelete = workProgram => {
    const workPrograms = this.state.workPrograms.filter(
      m => m._id !== workProgram._id
    );
    this.setState({ workPrograms });
  };

  handleLike = workProgram => {
    const workPrograms = [...this.state.workPrograms];
    const index = workPrograms.indexOf(workProgram);
    workPrograms[index] = { ...workPrograms[index] };
    workPrograms[index].liked = !workPrograms[index].liked;
    this.setState({ workPrograms });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      workPrograms: allWorkPrograms
    } = this.state;

    let filtered = allWorkPrograms;
    if (searchQuery)
      filtered = allWorkPrograms.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const workPrograms = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: workPrograms };
  };

  render() {
    const { length: count } = this.state.workPrograms;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no workPrograms in the database.</p>;

    const { totalCount, data: workPrograms } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-xl">
          <Link
            to="/workPrograms/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Entry
          </Link>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <WorkProgramsTable
            workPrograms={workPrograms}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default WorkPrograms;
