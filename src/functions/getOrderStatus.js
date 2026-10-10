const { app } = require("@azure/functions");

app.http("getOrderStatus", {
    methods: ["GET"],
    authLevel: "anonymous",
    route: "orders/{order_id}",

    handler: async (request, context) => {
        const orderId = request.params.order_id.trim().toUpperCase();

        context.log("Order lookup", {
            orderId,
            invocationId: context.invocationId
        });

        if (orderId === "ORD-1002") {
            context.error("Simulated order service failure");

            return {
                status: 503,
                jsonBody: {
                    error: "Order service temporarily unavailable"
                }
            };
        }

        if (orderId === "ORD-1001") {
            return {
                status: 200,
                jsonBody: {
                    order_id: orderId,
                    status: "Shipped",
                    estimated_delivery: "2026-10-15"
                }
            };
        }

        return {
            status: 404,
            jsonBody: {
                error: "Order not found"
            }
        };
    }
});