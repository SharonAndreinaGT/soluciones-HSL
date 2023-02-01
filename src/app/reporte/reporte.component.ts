import { Component } from '@angular/core';

   // PARA PDF
   const jsPDF = require('jspdf');
   // no se ha usado todavia
   import html2Canvas from 'html2canvas';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']

})
export class ReporteComponent {

  constructor() {
    this.downloadPDF();
  }
  public downloadPDF(): void {
    const doc = new jsPDF();

    doc.text('Hello world!', 10, 10);
    doc.save('hello-world.pdf');
  }

}
