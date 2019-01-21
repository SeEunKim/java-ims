package codesquad.service;

import codesquad.UnAuthorizedException;
import codesquad.domain.*;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.naming.AuthenticationException;
import java.util.List;

import static org.slf4j.LoggerFactory.getLogger;

@Service
public class AnswerService {
    private static final Logger logger = getLogger(AnswerService.class);

    @Resource(name = "issueRepository")
    private IssueRepository issueRepository;

    @Resource(name = "answerRepository")
    private AnswerRepository answerRepository;

    public Answer add(User loginUser, long issueId, String inputAnswer) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(UnAuthorizedException::new);

        Answer answer = new Answer(inputAnswer);
        answer.toIssue(issue);
        answer.writerBy(loginUser);

        return answerRepository.save(answer);
    }

    public List<Answer> findAll() {
        return answerRepository.findAll();
    }

    public Answer findById(long id) {
        logger.debug("## findById : {}",  answerRepository.findById(id).orElse(null));
        return answerRepository.findById(id)
                .orElseThrow(UnAuthorizedException::new);
    }

    @Transactional
    public Answer update(User loginUser, long id, String updateAnswer) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(UnAuthorizedException::new);

        answer.update(loginUser, updateAnswer);
        return answer;
    }
}
