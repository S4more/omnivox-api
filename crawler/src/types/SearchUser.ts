export interface SearchUserWrapper {
    d: {
        __type: 'Skytech.Services.SelectionIndividu.ItemSelectionneList' | string,
        ItemsSelectionnes: SearchUser[],
        IndicateurSelectionAnSession: boolean,
        IndicateurUniteOrganisationnelle: boolean,
        DoitAfficherTypeItemIndividu: boolean,
        MessageListeVide: any // Got null?
    }
}

export interface SearchUser {
    __type: 'Skytech.Services.SelectionIndividu.ItemSelectionne' | string,
    /** Empty? */
    IdItemSelectionne: string,
    /** User name */
    Titre: string,
    /** Empty? */
    Description: string,

    TexteLienAjoutTous: null,
    TexteLienExpandItem: null,

    // These will probably trigger when searching from course instead
    // of name.
    NoCours: null,
    TitreCours: null,
    NoGroupe: null,
    NbEtudiants: number,
    NbEnseignants: number,
    NbIndividus: number,
    // Student is probably 3.
    TypeItemSelectionne: number,
    TypeItemString: 'Etudiant' | string,
    RegroupementDataSource: 'RegroupementRechercheClara' | string,
    // No idea
    ListeIndividuDansItemSelectionne: any
    IndicateurModifie: boolean,
    IndicateurExpanded: any | null // ?
    ModeExpandSeulement: boolean,
    ServEnseignement_Campus_AnSession: '' | string,
    TagDataSourceItem: string // I got IdIndividuClara=[numbers] (not sure if it's sensitive data)
    TagDataSourceItemDictionnary: string[],
    Etat: number,
    Numero: string,
    Username: string
    DateFinAbsence: string // C# date /Date(-62135578800000)/
}
