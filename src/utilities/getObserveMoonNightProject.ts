import { getPayload } from "payload";
import configPromise from "@payload-config";

export interface ObserveMoonEventResult {
  id: string | number;
  title: string;
  year: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  eventTime?: string;
  location?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  heroImage?: any;
  isPaid?: boolean;
  ticketPrice?: string;
  bankAccountNumber?: string;
  paymentDetails?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  agenda?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locations?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  partners?: any[];
  feedbackUrl?: string;
  isFeedbackActive?: boolean;
  feedbackFormHeight?: string;
  confirmationEmailSubject?: string;
  confirmationEmailBody?: string;
  status: string;
  slug: string;
}

export async function getObserveMoonNightProject(
  slugParam?: string,
): Promise<ObserveMoonEventResult | null> {
  try {
    const payload = await getPayload({ config: configPromise });

    if (slugParam) {
      const yearMatch = slugParam.match(/\d{4}/);
      const searchYear = yearMatch ? yearMatch[0] : slugParam;

      // 1. Query observe-moon-events collection by year
      const yearResult = await payload.find({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: "observe-moon-events" as any,
        where: {
          and: [
            {
              year: {
                equals: searchYear,
              },
            },
            {
              status: {
                equals: "published",
              },
            },
          ],
        },
        limit: 1,
      });

      if (yearResult.docs[0]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const doc = yearResult.docs[0] as any;
        return {
          id: doc.id,
          title:
            doc.title || `International Observe the Moon Night ${doc.year}`,
          year: doc.year,
          eventDate: doc.eventDate,
          startTime: doc.startTime,
          endTime: doc.endTime,
          eventTime:
            doc.eventTime ||
            (doc.startTime
              ? `${doc.startTime}${doc.endTime ? ` - ${doc.endTime}` : ""}`
              : undefined),
          location: doc.location,
          description: doc.description,
          heroImage: doc.heroImage,
          isPaid: doc.isPaid || false,
          ticketPrice: doc.ticketPrice || "",
          bankAccountNumber: doc.bankAccountNumber || "",
          paymentDetails: doc.paymentDetails || "",
          agenda: doc.agenda || [],
          locations: doc.locations || [],
          partners: doc.partners || [],
          feedbackUrl: doc.feedbackUrl || "",
          isFeedbackActive: doc.isFeedbackActive ?? true,
          feedbackFormHeight: doc.feedbackFormHeight || "1850",
          confirmationEmailSubject: doc.confirmationEmailSubject || undefined,
          confirmationEmailBody: doc.confirmationEmailBody || undefined,
          status: doc.status,
          slug: `observe-the-moon-night/${doc.year}`,
        };
      }

      return null;
    }

    // Default route (no slug param): fetch the latest active/published observe-moon-event sorted by year / createdAt
    const latestResult = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: "observe-moon-events" as any,
      where: {
        status: {
          equals: "published",
        },
      },
      sort: "-year",
      limit: 1,
    });

    if (latestResult.docs[0]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = latestResult.docs[0] as any;
      return {
        id: doc.id,
        title: doc.title || `International Observe the Moon Night ${doc.year}`,
        year: doc.year,
        eventDate: doc.eventDate,
        startTime: doc.startTime,
        endTime: doc.endTime,
        eventTime:
          doc.eventTime ||
          (doc.startTime
            ? `${doc.startTime}${doc.endTime ? ` - ${doc.endTime}` : ""}`
            : undefined),
        location: doc.location,
        description: doc.description,
        heroImage: doc.heroImage,
        isPaid: doc.isPaid || false,
        ticketPrice: doc.ticketPrice || "",
        bankAccountNumber: doc.bankAccountNumber || "",
        paymentDetails: doc.paymentDetails || "",
        agenda: doc.agenda || [],
        locations: doc.locations || [],
        partners: doc.partners || [],
        feedbackUrl: doc.feedbackUrl || "",
        isFeedbackActive: doc.isFeedbackActive ?? true,
        feedbackFormHeight: doc.feedbackFormHeight || "1850",
        confirmationEmailSubject: doc.confirmationEmailSubject || undefined,
        confirmationEmailBody: doc.confirmationEmailBody || undefined,
        status: doc.status,
        slug: `observe-the-moon-night/${doc.year}`,
      };
    }

    return null;
  } catch (error) {
    console.error("Error querying Observe Moon Event collection:", error);
    return null;
  }
}
