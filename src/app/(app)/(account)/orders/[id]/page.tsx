import type { Order } from "@/payload-types";
import type { Metadata } from "next";

import { Price } from "@/components/Price";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/utilities/formatDateTime";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import { ProductItem } from "@/components/ProductItem";
import { headers as getHeaders } from "next/headers.js";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { OrderStatus } from "@/components/OrderStatus";
import { AddressItem } from "@/components/addresses/AddressItem";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ email?: string }>;
};

export default async function OrderPage({ params, searchParams }: PageProps) {
  const headers = await getHeaders();
  let payload: any = null;
  let user = null;
  try {
    payload = await getPayload({ config: configPromise });
    const authResult = await payload?.auth({ headers });
    user = authResult.user;
  } catch (err) {
    console.warn("DB connection failed, proceeding without user.");
  }

  const { id } = await params;
  const { email = "" } = await searchParams;

  let order: Order | null = null;

  try {
    const {
      docs: [orderResult],
    } = await payload.find({
      collection: "orders",
      user,
      overrideAccess: !user,
      depth: 2,
      where: {
        and: [
          {
            id: {
              equals: id,
            },
          },
          ...(user
            ? [
                {
                  customer: {
                    equals: user.id,
                  },
                },
              ]
            : []),
          ...(email
            ? [
                {
                  customerEmail: {
                    equals: email,
                  },
                },
              ]
            : []),
        ],
      },
      select: {
        amount: true,
        currency: true,
        items: true,
        customerEmail: true,
        customer: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        shippingAddress: true,
      },
    });

    const canAccessAsGuest =
      !user &&
      email &&
      orderResult &&
      orderResult.customerEmail &&
      orderResult.customerEmail === email;
    const canAccessAsUser =
      user &&
      orderResult &&
      orderResult.customer &&
      (typeof orderResult.customer === "object"
        ? orderResult.customer.id
        : orderResult.customer) === user.id;

    if (orderResult && (canAccessAsGuest || canAccessAsUser)) {
      order = orderResult;
    }
  } catch (error) {
    console.error(error);
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-between items-start sm:items-center mb-8">
        {user ? (
          <Button asChild variant="ghost" className="-ml-4 hover:bg-muted/50">
            <Link href="/orders" className="flex items-center gap-2">
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Back to all orders</span>
            </Link>
          </Button>
        ) : (
          <div></div>
        )}

        <div className="flex flex-col text-right">
          <h1 className="text-xl font-bold tracking-tight">
            Order #{order.id}
          </h1>
        </div>
      </div>

      <div className="bg-card border shadow-sm rounded-2xl overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 bg-muted/20 border-b flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div className="">
            <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">
              Order Date
            </p>
            <p className="text-lg font-medium">
              <time dateTime={order.createdAt}>
                {formatDateTime({
                  date: order.createdAt,
                  format: "MMMM dd, yyyy",
                })}
              </time>
            </p>
          </div>

          <div className="">
            <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">
              Total
            </p>
            {order.amount && (
              <Price
                className="text-lg font-bold text-primary"
                amount={order.amount}
              />
            )}
          </div>

          {order.status && (
            <div className="grow max-w-[33%]">
              <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                Status
              </p>
              <OrderStatus className="text-sm" status={order.status} />
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 flex flex-col gap-12">
          {order.items && (
            <div>
              <h2 className="text-lg font-semibold mb-6 pb-2 border-b">
                Items
              </h2>
              <ul className="flex flex-col gap-6">
                {order.items?.map((item, index) => {
                  if (typeof item.product === "string") {
                    return null;
                  }

                  if (!item.product || typeof item.product !== "object") {
                    return (
                      <div key={index}>This item is no longer available.</div>
                    );
                  }

                  const variant =
                    item.variant && typeof item.variant === "object"
                      ? item.variant
                      : undefined;

                  return (
                    <li key={item.id}>
                      <ProductItem
                        product={item.product}
                        quantity={item.quantity}
                        variant={variant}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {order.shippingAddress && (
            <div>
              <h2 className="text-lg font-semibold mb-6 pb-2 border-b">
                Shipping Address
              </h2>

              {/* @ts-expect-error - some kind of type hell */}
              <AddressItem address={order.shippingAddress} hideActions />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    description: `Order details for order ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Order ${id}`,
      url: `/orders/${id}`,
    }),
    title: `Order ${id}`,
  };
}
