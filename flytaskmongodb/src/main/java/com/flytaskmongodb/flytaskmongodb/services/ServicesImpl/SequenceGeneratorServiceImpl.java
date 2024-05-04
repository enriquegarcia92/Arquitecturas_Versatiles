package com.flytaskmongodb.flytaskmongodb.services.ServicesImpl;
import com.flytaskmongodb.flytaskmongodb.model.Sequence;
import com.flytaskmongodb.flytaskmongodb.services.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class SequenceGeneratorServiceImpl implements SequenceGeneratorService {
    @Autowired
    private MongoOperations mongoOperations;

    public Integer generarIdSecuencial(String clave) {
        Sequence contador = mongoOperations.findAndModify(
                Query.query(Criteria.where("_id").is(clave)),
                new Update().inc("value", 1), // Incrementa el valor del contador
                FindAndModifyOptions.options().returnNew(true).upsert(true),
                Sequence.class
        );
        return contador.getValue(); // Devuelve el valor actualizado del contador
    }
}
