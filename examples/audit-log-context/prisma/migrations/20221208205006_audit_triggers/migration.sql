-- Product audit trigger function
CREATE OR REPLACE FUNCTION "audit"."Product_audit"() RETURNS TRIGGER AS $$
    BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO "audit"."ProductVersion"
            VALUES (DEFAULT, 'DELETE', NULL, current_setting('app.current_user_id', TRUE)::int, now(), OLD.*);
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO "audit"."ProductVersion"
            VALUES (DEFAULT, 'UPDATE', NEW."id", current_setting('app.current_user_id', TRUE)::int, now(), NEW.*);
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO "audit"."ProductVersion"
            VALUES (DEFAULT, 'INSERT', NEW."id", current_setting('app.current_user_id', TRUE)::int, now(), NEW.*);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

-- Order audit trigger function
CREATE OR REPLACE FUNCTION "audit"."Order_audit"() RETURNS TRIGGER AS $$
    BEGIN
        IF (TG_OP = 'DELETE') THEN
            INSERT INTO "audit"."OrderVersion"
            VALUES (DEFAULT, 'DELETE', NULL, current_setting('app.current_user_id', TRUE)::int, now(), OLD.*);
        ELSIF (TG_OP = 'UPDATE') THEN
            INSERT INTO "audit"."OrderVersion"
            VALUES (DEFAULT, 'UPDATE', NEW."id", current_setting('app.current_user_id', TRUE)::int, now(), NEW.*);
        ELSIF (TG_OP = 'INSERT') THEN
            INSERT INTO "audit"."OrderVersion"
            VALUES (DEFAULT, 'INSERT', NEW."id", current_setting('app.current_user_id', TRUE)::int, now(), NEW.*);
        END IF;
        RETURN NULL;
    END;
$$ LANGUAGE plpgsql;

-- Product trigger
CREATE TRIGGER audit
AFTER INSERT OR UPDATE OR DELETE ON "public"."Product"
    FOR EACH ROW EXECUTE FUNCTION "audit"."Product_audit"();

-- Order trigger
CREATE TRIGGER audit
AFTER INSERT OR UPDATE OR DELETE ON "public"."Order"
    FOR EACH ROW EXECUTE FUNCTION "audit"."Order_audit"();
