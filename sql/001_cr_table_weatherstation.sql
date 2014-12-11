-- Table: weatherstation

-- DROP TABLE weatherstation;

CREATE TABLE weatherstation
(
  cityId integer NOT NULL,
  cityName character varying(256),
  longitude numeric,
  latitude numeric,
  CONSTRAINT spatial_ref_sys_pkey PRIMARY KEY (srid),
  CONSTRAINT spatial_ref_sys_srid_check CHECK (srid > 0 AND srid <= 998999)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE weatherstation
  OWNER TO postgres;
GRANT ALL ON TABLE weatherstation TO postgres;
GRANT SELECT ON TABLE weatherstation TO public;