-- Table: weatherstation

-- DROP TABLE weatherstation;

CREATE TABLE weatherstation
(
  cityId integer NOT NULL,
  cityName character varying(256),
  longitude numeric,
  latitude numeric,
  CONSTRAINT weatherstation_pkey PRIMARY KEY (cityId),
)
WITH (
  OIDS=FALSE
);
ALTER TABLE weatherstation
  OWNER TO postgres;
GRANT ALL ON TABLE weatherstation TO postgres;
GRANT SELECT ON TABLE weatherstation TO public;