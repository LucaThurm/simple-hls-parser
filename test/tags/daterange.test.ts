import { Daterange } from '../../src/tags/daterange';

const valid =
  '#EXT-X-DATERANGE:ID="ID",CLASS="CLASS",START-DATE="2023-02-04T12:39:53+00:00",END-DATE="2023-02-04T12:39:53+00:00",DURATION=10.7,PLANNED-DURATION=10.7,SCTE35-CMD=245FC,SCTE35-OUT=245FC,SCTE35-IN=245FC,END-ON-NEXT=YES';

const minimal =
  '#EXT-X-DATERANGE:ID="ID",CLASS="CLASS",START-DATE="2023-02-04T12:39:53+00:00"';

const clientAttrs =
  '#EXT-X-DATERANGE:ID="ID",CLASS="CLASS",START-DATE="2023-02-04T12:39:53+00:00",X-HEX=245FC,X-FLOAT=10.7,X-STRING="STRING"';

describe('Daterange', () => {
  it(`parses ${valid}`, () => {
    const daterange = new Daterange(valid);
    expect(daterange.id).toBe('ID');
    expect(daterange.class).toBe('CLASS');
    expect(daterange.startDate).toBe('2023-02-04T12:39:53+00:00');
    expect(daterange.endDate).toBe('2023-02-04T12:39:53+00:00');
    expect(daterange.duration).toBe(10.7);
    expect(daterange.plannedDuration).toBe(10.7);
    expect(daterange.scte35Cmd).toBe('245FC');
    expect(daterange.scte35Out).toBe('245FC');
    expect(daterange.scte35In).toBe('245FC');
    expect(daterange.endOnNext).toBe(true);
  });

  it(`parses ${minimal}`, () => {
    const daterange = new Daterange(minimal);
    expect(daterange.id).toBe('ID');
    expect(daterange.class).toBeUndefined;
    expect(daterange.startDate).toBe('2023-02-04T12:39:53+00:00');
    expect(daterange.endDate).toBeUndefined();
    expect(daterange.duration).toBeUndefined();
    expect(daterange.plannedDuration).toBeUndefined();
    expect(daterange.scte35Cmd).toBeUndefined();
    expect(daterange.scte35Out).toBeUndefined();
    expect(daterange.scte35In).toBeUndefined();
    expect(daterange.endOnNext).toBeUndefined();
  });

  it(`parses ${clientAttrs}`, () => {
    const daterange = new Daterange(clientAttrs);
    expect(daterange.clientAttributes['X-HEX']).toBe('245FC');
    // TODO: this fails, implement parsing of numbers directly in the parse-attribute-list use case!
    expect(daterange.clientAttributes['X-FLOAT']).toBe(10.7);
    expect(daterange.clientAttributes['X-STRING']).toBe('STRING');
  });
});
