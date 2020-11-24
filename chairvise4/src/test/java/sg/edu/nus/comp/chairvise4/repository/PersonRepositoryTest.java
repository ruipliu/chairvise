package sg.edu.nus.comp.chairvise4.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import sg.edu.nus.comp.chairvise4.config.DataConfig;
import sg.edu.nus.comp.chairvise4.entity.Person;

import javax.transaction.Transactional;

/**
 * @author liuruiping
 * @version 1.0
 * @date 10/7/2020 3:41 PM
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = DataConfig.class)
public class PersonRepositoryTest {

    @Autowired
    private PersonRepository personRepository;

    @Test
    @Transactional
    @Rollback(value = false)
    public void testInsertPerson() {
        Person person = new Person();
        person.setName("John Smith");
        person.setEmail("xxx@gmail.com");
        personRepository.saveAndFlush(person);
    }
}
