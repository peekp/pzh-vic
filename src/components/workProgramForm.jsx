import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getWorkProgram,
  saveWorkProgram
} from "../services/fakeWorkProgramService";

class WorkProgramForm extends Form {
  state = {
    data: {
      PostNr: "",
      OrganisatieEenheid: "",
      Afdeling: "",
      Bureau: "",
      Kostenplaats: "",
      DocumentNummer: "",
      LeverancierInkoopOmschrijving: "",
      BedragFactuur: "",
      BedragBesluit: "",
      SoortInkoop: "",
      SoortFactuur: "",
      KC1: "",
      KC2: "",
      KC3: "",
      KC4: "",
      KC5: "",
      KC6: "",
      KC7_1: "",
      KC7_2: "",
      KC8_1: "",
      KC8_2: "",
      KC9_1: "",
      KC9_2: "",
      KC10_1: "",
      KC10_2: "",
      KC11_1: "",
      KC11_2: "",
      KC12_1: "",
      KC12_2: "",
      KC13: "",
      KC14: "",
      KC15: "",
      KC16: "",
      Opmerkingen: "",
      Controleur: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    PostNr: Joi.string().label("Postnr."),
    OrganisatieEenheid: Joi.string().label("Organisatie-Eenheid"),
    Afdeling: Joi.string().label("Afdeling"),
    Bureau: Joi.string().label("Bureau"),
    Kostenplaats: Joi.string().label("Kostenplaats"),
    DocumentNummer: Joi.string().label("Documentnummer (CODA)"),
    LeverancierInkoopOmschrijving: Joi.string().label(
      "Leverancier & Inkoop Omschrijving"
    ),
    BedragFactuur: Joi.string().label("Bedrag Factuur"),
    BedragBesluit: Joi.string().label("Bedrag Besluit"),
    SoortInkoop: Joi.string().label("Soort Inkoop"),
    SoortFactuur: Joi.string().label("Soort Factuur"),
    KC1: Joi.string().label("KC1"),
    KC2: Joi.string().label("KC2"),
    KC3: Joi.string().label("KC3"),
    KC4: Joi.string().label("KC4"),
    KC5: Joi.string().label("KC5"),
    KC6: Joi.string().label("KC6"),
    KC7_1: Joi.string().label("KC7-1"),
    KC7_2: Joi.string().label("KC7-2"),
    KC8_1: Joi.string().label("KC8-1"),
    KC8_2: Joi.string().label("KC8-2"),
    KC9_1: Joi.string().label("KC9-1"),
    KC9_2: Joi.string().label("KC9-2"),
    KC10_1: Joi.string().label("KC10-1"),
    KC10_2: Joi.string().label("KC10-2"),
    KC11_1: Joi.string().label("KC11-1"),
    KC11_2: Joi.string().label("KC11-2"),
    KC12_1: Joi.string().label("KC12-1"),
    KC12_2: Joi.string().label("KC12-2"),
    KC13: Joi.string().label("KC13"),
    KC14: Joi.string().label("KC14"),
    KC15: Joi.string().label("KC15"),
    KC16: Joi.string().label("KC16"),
    Opmerkingen: Joi.string().label("Opmerkingen"),
    Controleur: Joi.string().label("Controleur")
  };

  componentDidMount() {
    const workProgramId = this.props.match.params.id;
    console.log("id : ", workProgramId);
    if (workProgramId === "new") return;

    const workProgram = getWorkProgram(workProgramId);
    console.log("workProgram : ", workProgramId, workProgram);
    if (!workProgram) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(workProgram) });
  }

  mapToViewModel(workProgram) {
    return {
      _id: workProgram._id,
      PostNr: workProgram.PostNr,
      OrganisatieEenheid: workProgram.OrganisatieEenheid,
      Afdeling: workProgram.Afdeling,
      Bureau: workProgram.Bureau,
      Kostenplaats: workProgram.Kostenplaats,
      DocumentNummer: workProgram.DocumentNummer,
      LeverancierInkoopOmschrijving: workProgram.LeverancierInkoopOmschrijving,
      BedragFactuur: workProgram.BedragFactuur,
      BedragBesluit: workProgram.BedragBesluit,
      SoortInkoop: workProgram.SoortInkoop,
      SoortFactuur: workProgram.SoortFactuur,
      KC1: workProgram.KC1,
      KC2: workProgram.KC2,
      KC3: workProgram.KC3,
      KC4: workProgram.KC4,
      KC5: workProgram.KC5,
      KC6: workProgram.KC6,
      KC7_1: workProgram.KC7_1,
      KC7_2: workProgram.KC7_2,
      KC8_1: workProgram.KC8_1,
      KC8_2: workProgram.KC8_2,
      KC9_1: workProgram.KC9_1,
      KC9_2: workProgram.KC9_2,
      KC10_1: workProgram.KC10_1,
      KC10_2: workProgram.KC10_2,
      KC11_1: workProgram.KC11_1,
      KC11_2: workProgram.KC11_2,
      KC12_1: workProgram.KC12_1,
      KC12_2: workProgram.KC12_2,
      KC13: workProgram.KC13,
      KC14: workProgram.KC14,
      KC15: workProgram.KC15,
      KC16: workProgram.KC16,
      Opmerkingen: workProgram.Opmerkingen,
      Controleur: workProgram.Controleur
    };
  }

  doSubmit = () => {
    saveWorkProgram(this.state.data);

    this.props.history.push("/workprograms");
  };

  render() {
    return (
      <div>
        <h1>Werkprogramma Formulier</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("PostNr", "Postnr.")}
          {this.renderInput("OrganisatieEenheid", "Organisatie-Eenheid")}
          {this.renderInput("Afdeling", "Afdeling")}
          {this.renderInput("Bureau", "Bureau")}
          {this.renderInput("Kostenplaats", "Kostenplaats")}
          {this.renderInput("DocumentNummer", "Documentnummer (CODA)")}
          {this.renderInput(
            "LeverancierInkoopOmschrijving",
            "Leverancier & Inkoop Omschrijving"
          )}
          {this.renderInput("BedragFactuur", "Bedrag Factuur")}
          {this.renderInput("BedragBesluit", "Bedrag Besluit")}
          {this.renderInput("SoortInkoop", "Soort Inkoop")}
          {this.renderInput("SoortFactuur", "Soort Factuur")}
          {this.renderInput("KC1", "KC1")}
          {this.renderInput("KC2", "KC2")}
          {this.renderInput("KC3", "KC3")}
          {this.renderInput("KC4", "KC4")}
          {this.renderInput("KC5", "KC5")}
          {this.renderInput("KC6", "KC6")}
          {this.renderInput("KC7_1", "KC7-1")}
          {this.renderInput("KC7_2", "KC7-2")}
          {this.renderInput("KC8_1", "KC8-1")}
          {this.renderInput("KC8_2", "KC8-2")}
          {this.renderInput("KC9_1", "KC9-1")}
          {this.renderInput("KC9_2", "KC9-2")}
          {this.renderInput("KC10_1", "KC10-1")}
          {this.renderInput("KC10_2", "KC10-2")}
          {this.renderInput("KC11_1", "KC11-1")}
          {this.renderInput("KC11_2", "KC11-2")}
          {this.renderInput("KC12_1", "KC12-1")}
          {this.renderInput("KC12_2", "KC12-2")}
          {this.renderInput("KC13", "KC13")}
          {this.renderInput("KC14", "KC14")}
          {this.renderInput("KC15", "KC15")}
          {this.renderInput("KC16", "KC16")}
          {this.renderInput("Opmerkingen", "Opmerkingen")}
          {this.renderInput("Controleur", "Controleur")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default WorkProgramForm;
