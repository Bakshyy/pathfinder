import rclpy
from rclpy.node import Node 

from geometry_msgs.msg import Twist 

class VelocitySubscriber(Node): 

    def __init__(self):
        super().__init__('velocity_subscriber')
        self.subscription = self.create_subscription(msg_type=Twist, topic='/cmd_vel',callback= self.listener_callback, qos_profile=10)
        self.subscription
    
    def listener_callback(self, msg): 
        self.get_logger().info(f"Linear: {msg.linear.x}, Angular: {msg.angular.z}")


def main(args=None): 
    rclpy.init(args=args)

    velocity_subscriber = VelocitySubscriber()

    rclpy.spin(velocity_subscriber)

    velocity_subscriber.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__': 
    main()