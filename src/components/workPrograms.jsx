import React, { Component } from "react";
import WorkProgramsTable from "./workProgramsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getWorkPrograms } from "../services/fakeWorkProgramService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class WorkPrograms extends Component {
  state = {
    workPrograms: [],
    genres: [],
    currentPage: 1,
    pageSize: 5,
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      workPrograms: allWorkPrograms
    } = this.state;

    const filtered = allWorkPrograms;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const workPrograms = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: workPrograms };
  };

  render() {
    const { length: count } = this.state.workPrograms;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no workPrograms in the database.</p>;

    const { totalCount, data: workPrograms } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-xl">
          <p>Weergave {totalCount} in the database.</p>
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
