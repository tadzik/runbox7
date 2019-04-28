export class Task {
    id:       string;
    VTODO:    any;

    constructor(data: any) {
        this.id = data['id'];
        this.VTODO = data['VTODO'];
    }
}
