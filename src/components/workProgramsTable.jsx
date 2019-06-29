import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class workProgramsTable extends Component {
  columns = [
    {
      path: "PostNr",
      label: "Post nr.",
      content: workProgram => (
        <Link to={`/workPrograms/${workProgram._id}`}>
          {workProgram.PostNr}
        </Link>
      )
    },
    { path: "OrganisatieEenheid", label: "Organisatie-Eenheid" },
    { path: "Afdeling", label: "Afdeling" },
    { path: "Bureau", label: "Bureau" },
    { path: "Kostenplaats", label: "Kostenplaats" },
    { path: "DocumentNummer", label: "Documentnummer (CODA)" },
    {
      path: "LeverancierInkoopOmschrijving",
      label: "Leverancier & Inkoop Omschrijving"
    },
    { path: "BedragFactuur", label: "Bedrag Factuur" },
    { path: "BedragBesluit", label: "Bedrag Besluit" },
    { path: "SoortInkoop", label: "Soort Inkoop" },
    { path: "SoortFactuur", label: "Soort Factuur" },
    { path: "KC1", label: "KC1" },
    { path: "KC2", label: "KC2" },
    { path: "KC3", label: "KC3" },
    { path: "KC4", label: "KC4" },
    { path: "KC5", label: "KC5" },
    { path: "KC6", label: "KC6" },
    { path: "KC7_1", label: "KC7-1" },
    { path: "KC7_2", label: "KC7-2" },
    { path: "KC8_1", label: "KC8-1" },
    { path: "KC8_2", label: "KC8-2" },
    { path: "KC9_1", label: "KC9-1" },
    { path: "KC9_2", label: "KC9-2" },
    { path: "KC10_1", label: "KC10-1" },
    { path: "KC10_2", label: "KC10-2" },
    { path: "KC11_1", label: "KC11-1" },
    { path: "KC11_2", label: "KC11-2" },
    { path: "KC12_1", label: "KC12-1" },
    { path: "KC12_2", label: "KC12-2" },
    { path: "KC13", label: "KC13" },
    { path: "KC14", label: "KC14" },
    { path: "KC15", label: "KC15" },
    { path: "KC16", label: "KC16" },
    // { path: "Opmerkingen", label: "Opmerkingen" },
    { path: "Controleur", label: "Controleur" },
    {
      key: "delete",
      content: workProgram => (
        <button
          onClick={() => this.props.onDelete(workProgram)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { workPrograms, onSort, sortColumn } = this.props;

    return (
      <div className="table-responsive-xl">
        <Table
          className="table"
          columns={this.columns}
          data={workPrograms}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default workProgramsTable;
