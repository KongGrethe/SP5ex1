package exception;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class QuoteNotFoundMapper implements ExceptionMapper<QuoteNotFoundException> {
    static Gson gson = new GsonBuilder().setPrettyPrinting().create();
    @Context 
    ServletContext context;
    
    @Override
    public Response toResponse(QuoteNotFoundException ex) {
        com.google.gson.JsonObject job = new JsonObject();
        job.addProperty("status", 404);
        job.addProperty("msg", ex.getMessage());
        return Response.status(404).entity(gson.toJson(job)).build();
	}
}
