import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Sample FAQ data
const faqs = [
  {
    id: 1,
    question: "What is your return policy?",
    answer: "You can return any unused item within 30 days for a full refund.",
  },
  {
    id: 2,
    question: "Do you offer international shipping?",
    answer: "Yes, we ship worldwide. Shipping fees may apply.",
  },
  {
    id: 3,
    question: "How do I track my order?",
    answer:
      "You will receive an email with tracking details once your order is shipped.",
  },
];

export function FAQS() {
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq) => (
        <Accordion key={faq.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
